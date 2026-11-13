// =========================================================================
// STITCH CAFÉ — REAL-TIME CLOUD SYNCHRONIZATION ENGINE
// Seamless cross-device synchronization between Customer Menu & Merchant POS/KDS
// Works on static GitHub Pages across different networks (4G, Wi-Fi) with zero backend
// =========================================================================

(function () {
  'use strict';

  const DEFAULT_CHANNEL = 'stitch_cafe_saas_sync_v1';
  const STORAGE_KEY_CHANNEL = 'stitch_sync_channel';
  const STORAGE_KEY_STOCK = 'stitch_out_of_stock_ids';
  const STORAGE_KEY_ORDERS = 'stitch_live_orders';
  const WS_ENDPOINT = 'wss://ntfy.sh/';
  const HTTP_ENDPOINT = 'https://ntfy.sh/';

  class StitchCloudSyncEngine {
    constructor() {
      this.channel = this.getChannel();
      this.ws = null;
      this.isConnected = false;
      this.reconnectAttempts = 0;
      this.maxReconnectDelay = 15000;
      this.listeners = {
        order: [],
        status: [],
        stock: [],
        alert: [],
        reservation: [],
        connection: []
      };
      this.processedEventIds = new Set();
      this.init();
    }

    getChannel() {
      try {
        return localStorage.getItem(STORAGE_KEY_CHANNEL) || DEFAULT_CHANNEL;
      } catch (_) {
        return DEFAULT_CHANNEL;
      }
    }

    setChannel(newChannel) {
      if (!newChannel || typeof newChannel !== 'string') return;
      this.channel = newChannel.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
      try {
        localStorage.setItem(STORAGE_KEY_CHANNEL, this.channel);
      } catch (_) {}
      this.connectWebSocket();
    }

    init() {
      this.connectWebSocket();
      this.listenToStorageEvents();
      // Catch up with any recent orders published while offline
      this.pollRecentEvents();
    }

    connectWebSocket() {
      if (typeof window === 'undefined' || typeof WebSocket === 'undefined') return;

      if (this.ws) {
        try {
          this.ws.onclose = null;
          this.ws.close();
        } catch (_) {}
      }

      const url = `${WS_ENDPOINT}${encodeURIComponent(this.channel)}/ws`;
      try {
        this.ws = new WebSocket(url);
      } catch (err) {
        console.warn('[StitchSync] WebSocket initialization failed, using HTTP fallback:', err);
        this.scheduleReconnect();
        return;
      }

      this.ws.onopen = () => {
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.notifyConnectionState(true);
      };

      this.ws.onmessage = (event) => {
        try {
          const raw = JSON.parse(event.data);
          if (raw.event === 'message' && raw.message) {
            const payload = JSON.parse(raw.message);
            this.handleIncomingPayload(payload, raw.id);
          }
        } catch (_) {}
      };

      this.ws.onerror = () => {
        this.isConnected = false;
        this.notifyConnectionState(false);
      };

      this.ws.onclose = () => {
        this.isConnected = false;
        this.notifyConnectionState(false);
        this.scheduleReconnect();
      };
    }

    scheduleReconnect() {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(1.5, this.reconnectAttempts), this.maxReconnectDelay);
      setTimeout(() => this.connectWebSocket(), delay);
    }

    notifyConnectionState(connected) {
      this.listeners.connection.forEach(cb => {
        try { cb(connected); } catch (_) {}
      });
      // Update DOM indicator if present
      if (typeof document !== 'undefined') {
        const dot = document.getElementById('cloud-sync-dot');
        const text = document.getElementById('cloud-sync-text');
        if (dot) {
          dot.className = connected ? 'w-2 h-2 rounded-full bg-emerald-500 animate-pulse' : 'w-2 h-2 rounded-full bg-amber-500';
        }
        if (text) {
          text.textContent = connected ? 'Cloud Live' : 'Reconnexion...';
        }
      }
    }

    async pollRecentEvents() {
      try {
        const res = await fetch(`${HTTP_ENDPOINT}${encodeURIComponent(this.channel)}/json?poll=1&since=5m`, { cache: 'no-store' });
        if (!res.ok) return;
        const text = await res.text();
        const lines = text.trim().split('\n').filter(Boolean);
        for (const line of lines) {
          try {
            const raw = JSON.parse(line);
            if (raw.event === 'message' && raw.message) {
              const payload = JSON.parse(raw.message);
              this.handleIncomingPayload(payload, raw.id);
            }
          } catch (_) {}
        }
      } catch (_) {}
    }

    listenToStorageEvents() {
      if (typeof window === 'undefined') return;
      window.addEventListener('storage', (e) => {
        if (e.key === STORAGE_KEY_STOCK && e.newValue) {
          try {
            const ids = JSON.parse(e.newValue);
            this.notifyStockListeners(ids);
          } catch (_) {}
        }
        if (e.key === STORAGE_KEY_ORDERS && e.newValue) {
          try {
            const orders = JSON.parse(e.newValue);
            if (Array.isArray(orders)) {
              window.dispatchEvent(new CustomEvent('stitch_orders_updated', { detail: { orders } }));
            }
          } catch (_) {}
        }
      });
    }

    handleIncomingPayload(payload, eventId) {
      if (!payload || typeof payload !== 'object' || !payload.type) return;
      if (eventId && this.processedEventIds.has(eventId)) return;
      if (eventId) {
        this.processedEventIds.add(eventId);
        if (this.processedEventIds.size > 200) {
          const first = this.processedEventIds.values().next().value;
          this.processedEventIds.delete(first);
        }
      }

      switch (payload.type) {
        case 'NEW_ORDER':
          if (payload.order) {
            this.syncOrderToLocalStorage(payload.order);
            this.listeners.order.forEach(cb => { try { cb(payload.order); } catch (_) {} });
            window.dispatchEvent(new CustomEvent('stitch_cloud_new_order', { detail: payload.order }));
          }
          break;

        case 'ORDER_STATUS_UPDATE':
          if (payload.orderId && payload.status) {
            this.updateLocalOrderStatus(payload.orderId, payload.status);
            this.listeners.status.forEach(cb => { try { cb(payload.orderId, payload.status); } catch (_) {} });
            window.dispatchEvent(new CustomEvent('stitch_cloud_order_status', { detail: payload }));
          }
          break;

        case 'STOCK_UPDATE':
          if (Array.isArray(payload.outOfStockIds)) {
            try {
              localStorage.setItem(STORAGE_KEY_STOCK, JSON.stringify(payload.outOfStockIds));
            } catch (_) {}
            this.notifyStockListeners(payload.outOfStockIds);
            window.dispatchEvent(new CustomEvent('stitch_cloud_stock_update', { detail: payload.outOfStockIds }));
          }
          break;

        case 'TABLE_ALERT':
          if (payload.alert) {
            this.listeners.alert.forEach(cb => { try { cb(payload.alert); } catch (_) {} });
            window.dispatchEvent(new CustomEvent('stitch_cloud_table_alert', { detail: payload.alert }));
          }
          break;

        case 'RESERVATION':
          if (payload.reservation) {
            this.listeners.reservation.forEach(cb => { try { cb(payload.reservation); } catch (_) {} });
            window.dispatchEvent(new CustomEvent('stitch_cloud_reservation', { detail: payload.reservation }));
          }
          break;
      }
    }

    notifyStockListeners(ids) {
      this.listeners.stock.forEach(cb => {
        try { cb(ids); } catch (_) {}
      });
    }

    syncOrderToLocalStorage(order) {
      try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY_ORDERS) || '[]');
        const filtered = Array.isArray(stored) ? stored.filter(o => o && o.id !== order.id) : [];
        filtered.unshift(order);
        localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(filtered));
      } catch (_) {}
    }

    updateLocalOrderStatus(orderId, status) {
      try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY_ORDERS) || '[]');
        if (Array.isArray(stored)) {
          let updated = false;
          stored.forEach(o => {
            if (o && o.id === orderId) {
              o.status = status;
              updated = true;
            }
          });
          if (updated) {
            localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(stored));
          }
        }
      } catch (_) {}
    }

    async publish(type, data = {}) {
      const payload = {
        type,
        ...data,
        timestamp: Date.now(),
        senderId: Math.random().toString(36).substring(2, 9)
      };

      const jsonStr = JSON.stringify(payload);

      // 1. Try WebSocket if connected
      let sentViaWs = false;
      if (this.ws && this.isConnected && this.ws.readyState === WebSocket.OPEN) {
        try {
          this.ws.send(jsonStr);
          sentViaWs = true;
        } catch (_) {}
      }

      // 2. Always send via HTTP to guarantee persistence and delivery to non-connected clients
      try {
        fetch(`${HTTP_ENDPOINT}${encodeURIComponent(this.channel)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: jsonStr
        }).catch(() => {});
      } catch (_) {}

      return true;
    }

    // Public API Methods
    sendNewOrder(order) {
      this.syncOrderToLocalStorage(order);
      return this.publish('NEW_ORDER', { order });
    }

    updateOrderStatus(orderId, status) {
      this.updateLocalOrderStatus(orderId, status);
      return this.publish('ORDER_STATUS_UPDATE', { orderId, status });
    }

    broadcastStock(outOfStockIds) {
      try {
        localStorage.setItem(STORAGE_KEY_STOCK, JSON.stringify(outOfStockIds));
      } catch (_) {}
      return this.publish('STOCK_UPDATE', { outOfStockIds });
    }

    sendTableAlert(alert) {
      return this.publish('TABLE_ALERT', { alert });
    }

    sendReservation(reservation) {
      return this.publish('RESERVATION', { reservation });
    }

    getOutOfStockIds() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY_STOCK);
        return raw ? JSON.parse(raw) : [];
      } catch (_) {
        return [];
      }
    }

    setProductStockStatus(productId, isAvailable) {
      const current = new Set(this.getOutOfStockIds());
      const strId = String(productId);
      if (isAvailable) {
        current.delete(strId);
      } else {
        current.add(strId);
      }
      const updated = Array.from(current);
      this.broadcastStock(updated);
      return updated;
    }

    // Event Listeners Registration
    onNewOrder(callback) { this.listeners.order.push(callback); }
    onOrderStatus(callback) { this.listeners.status.push(callback); }
    onStockUpdate(callback) { this.listeners.stock.push(callback); }
    onTableAlert(callback) { this.listeners.alert.push(callback); }
    onReservation(callback) { this.listeners.reservation.push(callback); }
    onConnectionChange(callback) { this.listeners.connection.push(callback); }
  }

  // Expose as global singleton
  if (typeof window !== 'undefined') {
    window.stitchSync = new StitchCloudSyncEngine();
  }
})();

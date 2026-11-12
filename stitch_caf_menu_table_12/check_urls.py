
import requests

urls = [
    "https://images.unsplash.com/photo-1502741119870-16c6b8d5bb4?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1621506289937-4c721a3123b7?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544787210-2213d2427303?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=800&auto=format&fit=crop"
]

for url in urls:
    try:
        r = requests.head(url, timeout=5)
        print(f"{url}: {r.status_code}")
    except Exception as e:
        print(f"{url}: Error {e}")

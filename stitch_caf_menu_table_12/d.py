import os
import requests
import sys

# Silent mode, log to file instead
log_file = r"download_log.txt"

def log(msg):
    try:
        with open(log_file, "a") as f:
            f.write(msg + "\n")
    except:
        pass

urls = {
    "bakery_1.jpg": "https://lh3.googleusercontent.com/aida-public/AB6AXuA4yxTrjplybSy3tivdZIqpAykri084L5Nj4ITNMaV9x8iiG-se_kiD1Wa5p5ZnMZXPyNzvUdGD-9c-ZLsKpl-74UVqutCJtd7YpMk3bbnJkH777pdAhEXu_F7jtei9Pu3oPh1_TSRBcaEhk5G9gk3aco5DSzS7bsfihmMjd7tfrgMdYFlf48mebUUQ0JD9Zm3C5fGrRZL7mmjCIPmVxW0o6QhP5cUCO-voI4uj6kMDiidWhU-AB3pNwIEDFrurwCYKWCK0obPceGo",
    "bakery_2.jpg": "https://lh3.googleusercontent.com/aida-public/AB6AXuDWXQYBr2UB9mKoM-3OljUM4Mbxqs0QeEqyCWbih9P2llDX1U2l_OCUTK6oizGPgdpSmloYOriqJP7lqzbSl-S_2WJb5b4yZibP6iRjAQWtYmZPcDYQ6uBeN1IKJHPrswHmKLeIQU8nTZCCuHgRj7Bi5t3p5s_zB8fdm7O-O7Qm_HED43a--LhjAHI664fTUwwqSH4OJum0FUowLkeXDkewdqtEYihwO9zJQVM-ekXCxwhzfrSSp-YDUl-9Eujlafqml2VaUB7kxQo",
    "bakery_3.jpg": "https://lh3.googleusercontent.com/aida-public/AB6AXuAGwz6vJnJ9G1Ygn-TJfSbp9HWAl5oplo_g241pWY8yeoIwsUa3mNcLK88FJOl7CzrgsIKqclAlE5rY2vIFQiVzLMFWDfZVBJ8sDjrB1tEIzWghhllLO6WTSSW4Zp9ln50KL3-Wbo1Jx5wf2iXIBynTxnYmh5wNnnATdVV3fy-Lm5eYcIpP-3nulhml1MV8gr-VZafmLg7a8e6cJVzOr5kuuvbk2wCGQXAyD_aSIiYklo6z2JYWbD1KV4rYpKY_QlSYd2mpkbeMiIU",
    "bakery_4.jpg": "https://lh3.googleusercontent.com/aida-public/AB6AXuBsP00_mSkTTD7XOht1m0f1PLmaPLvSyyl_EGWPSSOiWpwmjKq7cxeuHpp4Xuj9GownfB0_6PO_pN15p8BHqqE5I4jI3UMBUmptIFoBsszRVnzFXh2tdy-s4bIGzA0w96Q92uIO4xLac3QDZ9TOiAR8pWlc5H_SOZfTGvPMlhuN6aVfLW7F_wafL5JOxsp4GQplcSsUBjTAz00KGzvYDEYxi8ORYUDf7Aj7XF_r0vTLKzvGH1OWOZ83WlIilWdCeiIYFdhvWJase8E",
    "bakery_5.jpg": "https://lh3.googleusercontent.com/aida-public/AB6AXuB2G_p_jRRdkHcAqubYRVvWsr1TxDFPx8O-eeNsiSLghADLxSJRYQMieySKjDUtFifCzsd3F-dp41WDMZS6BQsV9MuXPJB7S8_802mE8SaAJ2iVblIM-msYW4FEBDBjb0Cun4u2vABRTjKL4X_Y8gZWPR795SOb0eVEDBsWF6Ig-8WbcNbv_xJDYkp7pa08HoiMefRQPVBpz2BZLoZ_XNiyV6MkGws2F-96XCTkx3_Zr6N57U2Jd9a7Y4I35CKttKR9hFGK3kYQCfg",
    "bakery_6.jpg": "https://lh3.googleusercontent.com/aida-public/AB6AXuC5VgizJ__ivEI0Nk_U_DkH9m713CSJAOlDlQL-z_tsQrrypMAoFFIt1OJBOULcQN1LhWAZ4Nizg1qcMPMiRg4cNTyMZ_O4xrI5FIAtPii1AA_IUODdDTVRYnmSC3oi7ZqqgIXL1A5dxX6zKvK9kvH7RSmwXWue5NICBb-IA-N_c1NUYKoejQrj26e6Us28IsoMLpcWBOQtxZpVuVOheAhFdUVTjua_9ffuSzADsYSZvuF09UoDcls6m1YabthQpwgTxR8Xf4wZda0",
    "bakery_7.jpg": "https://lh3.googleusercontent.com/aida-public/AB6AXuATB369qZC7VlSNGUPM_0qJa8T-pzAF0NXgK2y33TDOjiNuTz20PMb9T13YvwX7G0DdpxT0mjCUH5KBN0tljD8sVZiWDm0PNbOkJ5eO3rUzuBG8hCtaYZVMSigNVf4inqx6Z4ncEsQPI7l7tfDMQfR5iPDwxiyLYw4P9GcnvzfRnKYq-4U2ed1pOqc0UQMj7lGYwy2z5MQD7i585pXYoQSE3cAp-hHNq-0HTvDk8AVwX5a4Ruz1ogNkDkAJrA3q9yA87cqdfYoOltc",
    "bakery_8.jpg": "https://lh3.googleusercontent.com/aida-public/AB6AXuC8pqreXdQ1Y9lHmtpVLICGMk-g0UhtrGGdFAFguHz_tLj1CF_KDwddadNvBSNJ0AnSAnxbuv6aQ_12CTzf8r-jTt_G8Vhp8o6o4Izi72N0LIv6TM8I5To-K-QkTlFAUFSdLwI-Ub2UaXN7fNEbMvhbUXjAZpCZi439NhcMiJ17UARLvNHQRzwE9CbuMYAIbGYzKcWZ70-7KpJejlZZ8vPV60x-g05mILQPAPK6LJ16hasdVabqCt6lhRZy8AU8X1apmusvwgyyrnM"
}

# Use relative path since we run from the root of the project usually
dest_path = r"swiggy-style_elite_main_menu_390x2500\assets"

if not os.path.exists(dest_path):
    try:
        os.makedirs(dest_path)
    except:
        log(f"Failed to create dir {dest_path}")

log("Starting download...")

for name, url in urls.items():
    file_path = os.path.join(dest_path, name)
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            with open(file_path, 'wb') as f:
                f.write(response.content)
            log(f"Successfully downloaded {name}")
        else:
            log(f"Failed to download {name}: Status code {response.status_code}")
    except Exception as e:
        log(f"Error downloading {name}: {e}")

log("Download complete.")

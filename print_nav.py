import re

file_path = "c:\\Users\\Bold Pilot\\Desktop\\CMR Dashboard V10\\intranet_v10.html"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# Extract the entire nav block
nav_match = re.search(r'<nav class="sidebar-nav">.*?</nav>', text, flags=re.DOTALL)
if nav_match:
    print(nav_match.group(0))
else:
    print("nav tag not found!")

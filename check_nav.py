import re

file_path = "c:\\Users\\Bold Pilot\\Desktop\\CMR Dashboard V10\\intranet_v10.html"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

nav_matches = re.findall(r'<div id="nav-[^"]*"', text)
print("Nav elements found:", nav_matches)

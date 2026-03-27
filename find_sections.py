import re

file_path = "c:\\Users\\Bold Pilot\\Desktop\\CMR Dashboard V10\\intranet_v10.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

sections = re.findall(r'<div [^>]*class="[^"]*view-section[^"]*"[^>]*id="([^"]+)"', content)
print("Sections found:", sections)

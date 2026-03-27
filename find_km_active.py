import re

file_path = "c:\\Users\\Bold Pilot\\Desktop\\CMR Dashboard V10\\intranet_v10.html"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

km_active_matches = re.findall(r'.*km-active.*', text)
print("km-active matches:")
for m in km_active_matches:
    print(m)

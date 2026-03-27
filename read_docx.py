import zipfile
import xml.etree.ElementTree as ET
import sys

def extract_text_from_docx(docx_path, out_path):
    try:
        with zipfile.ZipFile(docx_path) as docx:
            xml_content = docx.read('word/document.xml')
            tree = ET.XML(xml_content)

            namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            paragraphs = []
            
            for paragraph in tree.iterfind('.//w:p', namespaces):
                texts = [node.text
                         for node in paragraph.iterfind('.//w:t', namespaces)
                         if node.text]
                if texts:
                    paragraphs.append(''.join(texts))

            with open(out_path, "w", encoding="utf-8") as f:
                f.write('\n'.join(paragraphs))
            print("Done")
    except Exception as e:
        print(f"Error reading docx: {e}")

if __name__ == '__main__':
    extract_text_from_docx("c:\\Users\\Bold Pilot\\Desktop\\CMR Dashboard V10\\2- [CMR] - DOCUMENT DES SPECIFICATIONS FONCTIONNELLES - V1.0.docx", "c:\\Users\\Bold Pilot\\Desktop\\CMR Dashboard V10\\docx_utf8.txt")

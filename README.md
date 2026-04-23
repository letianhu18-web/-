# -from docx import Document

# 创建一个新的 Word 文档
doc = Document()

# 添加标题
doc.add_heading('我的第一个 Word 文档', level=1)

# 添加段落
doc.add_paragraph('这是第一段内容。')
doc.add_paragraph('这份文档是用 Python 自动生成的。')

# 添加小标题
doc.add_heading('第二部分', level=2)

# 添加更多内容
doc.add_paragraph('你可以继续往里面写作业、报告、总结。')

# 保存文件
doc.save('example.docx')

print("Word 文档已生成：example.docx")

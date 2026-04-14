def generate_pdf(markdown_text: str, output_path: str):
    with open(output_path, "w") as f:
        f.write(markdown_text)

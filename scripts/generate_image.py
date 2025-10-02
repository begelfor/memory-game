import time
import os
import yaml
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/evg/.ssh/resonant.json"
import vertexai
from pathlib import Path
from vertexai.vision_models import ImageGenerationModel
vertexai.init(project="resonant-feat-256420", location="us-central1")
model = ImageGenerationModel.from_pretrained("imagen-3.0-generate-002")


def generate_image_from_text(prompt: str, output_file: str, number_of_images: int = 1) -> str | list[str]:
    images = model.generate_images(
        prompt=prompt,
        # Optional parameters
        number_of_images=number_of_images,
        language="en",
        aspect_ratio="1:1",
        add_watermark=False,
        # safety_filter_level="block_fewest",
        # person_generation="allow_adult",
    )
    if number_of_images == 1:
        path = output_file.with_suffix(".jpg")
        images[0].save(location=path, include_generation_parameters=False)
        return path
    else:
        paths = []
        for i, image in enumerate(images):
            path = output_file.with_suffix(f"_{i}.jpg")
            image.save(location=path, include_generation_parameters=False)
            paths.append(path)
        return paths

    
def generate_missing_images(wordlist_path: str, output_folder: str):
    with open(wordlist_path, "r") as f:
        wordlist = []
        data = yaml.safe_load(f)
        for category in data.values():
            wordlist.extend(category)
    counter = 0
    for item in wordlist:
        if isinstance(item, dict):
            for word, description in item.items():
                break
        else:
            word = item
            description = item
        if not os.path.exists((output_folder / word).with_suffix(".jpg")):
            if counter > 0:
                time.sleep(40)
            print(f"Generating {word} with description {description}")
            try:
                generate_image_from_text(f"A cartoon style image of {description} with a white background. Do not make non-human objects anthropomorphic.", output_folder / word)
                print(f"Done with {word}")
                counter += 1
            except Exception as e:
                print(f"Error generating {word}: {e}")

    print(f"Generated {counter} images")

if __name__ == "__main__":
    path = Path("public/images")
    generate_missing_images("public/wordLists.yaml", path)
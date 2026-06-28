import sys
from nudenet import NudeDetector

detector = NudeDetector()

image_path = sys.argv[1]
results = detector.detect(image_path)

print(f"Image: {image_path}")
print(f"Detections: {len(results)}")
for r in results:
    print(r)
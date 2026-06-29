import sys
import json
from nudenet import NudeDetector

FLAGGED_CLASSES = [
    'FEMALE_GENITALIA_EXPOSED',
    'FEMALE_BREAST_EXPOSED',
    'MALE_GENITALIA_EXPOSED',
    'ANUS_EXPOSED',
    'BUTTOCKS_EXPOSED',
]

CONFIDENCE_THRESHOLD = 0.6

detector = NudeDetector()

image_path = sys.argv[1]
raw_results = detector.detect(image_path)

flagged = [
    {
        'class': r['class'],
        'confidence': round(r['score'], 3)
    }
    for r in raw_results
    if r['class'] in FLAGGED_CLASSES and r['score'] >= CONFIDENCE_THRESHOLD
]

output = {
    'image': image_path,
    'flagged': len(flagged) > 0,
    'detections': flagged
}

print(json.dumps(output))
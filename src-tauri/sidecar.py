import sys
import os
import json

# Point to venv so NudeNet is available regardless of which python runs this
script_dir = os.path.dirname(os.path.abspath(__file__))
venv_packages = os.path.join(script_dir, 'venv', 'Lib', 'site-packages')
sys.path.insert(0, venv_packages)

from nudenet import NudeDetector

FLAGGED_CLASSES = [
    'FEMALE_GENITALIA_EXPOSED',
    'FEMALE_BREAST_EXPOSED',
    'MALE_GENITALIA_EXPOSED',
    'ANUS_EXPOSED',
    'BUTTOCKS_EXPOSED',
]

CONFIDENCE_THRESHOLD = 0.6

def analyze_image(image_path):
    detector = NudeDetector()
    raw_results = detector.detect(image_path)

    flagged = [
        {
            'class': r['class'],
            'confidence': round(r['score'], 3)
        }
        for r in raw_results
        if r['class'] in FLAGGED_CLASSES and r['score'] >= CONFIDENCE_THRESHOLD
    ]

    return {
        'status': 'ok',
        'image': image_path,
        'flagged': len(flagged) > 0,
        'detections': flagged
    }

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(json.dumps({'status': 'error', 'message': 'No image path provided'}))
        sys.exit(1)

    image_path = sys.argv[1]

    if not os.path.exists(image_path):
        print(json.dumps({'status': 'error', 'message': f'File not found: {image_path}'}))
        sys.exit(1)

    result = analyze_image(image_path)
    print(json.dumps(result))
    sys.stdout.flush()
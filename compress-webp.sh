#!/bin/bash
# Create a backup directory
mkdir -p public/frames-webp-backup
cp public/frames-webp/*.webp public/frames-webp-backup/

# Compress all WebP files
cd public/frames-webp
for file in *.webp; do
    echo "Compressing $file..."
    cwebp -q 75 -m 6 "$file" -o "temp_$file"
    mv "temp_$file" "$file"
done

echo "Compression complete!"
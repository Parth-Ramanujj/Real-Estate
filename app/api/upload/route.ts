import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
    const data = await request.formData();
    const files: File[] = [];

    // Extract all files from formData
    // We iterate because we might receive multiple files for the gallery
    for (const [key, value] of data.entries()) {
        if (value instanceof File) {
            files.push(value);
        }
    }

    if (files.length === 0) {
        return NextResponse.json({ success: false, message: 'No files uploaded' }, { status: 400 });
    }

    const uploadedUrls: string[] = [];
    const uploadDir = join(process.cwd(), 'public/uploads');

    // Ensure upload directory exists
    try {
        await mkdir(uploadDir, { recursive: true });
    } catch (e) {
        console.error('Error creating upload directory:', e);
    }

    try {
        for (const file of files) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Generate unique filename
            const timestamp = Date.now();
            const filename = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
            const path = join(uploadDir, filename);

            await writeFile(path, buffer);
            uploadedUrls.push(`/uploads/${filename}`);
        }

        return NextResponse.json({ success: true, urls: uploadedUrls });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 });
    }
}

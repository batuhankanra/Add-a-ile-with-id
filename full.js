import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// __dirname kullanımı için
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Yükleme klasörünü kontrol et ve oluştur
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer için depolama ayarları
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userDir = path.join(uploadDir, req.body.id)   ;
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir);
        }
        cb(null, userDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Dosya adı orijinal haliyle kaydedilecek
    }
});

const upload = multer({ storage: storage });

// Dosya yükleme için POST isteği
app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.body.userId);
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    return res.status(200).json({ message: 'File uploaded successfully' });
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

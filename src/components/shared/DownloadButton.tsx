import { Download } from 'lucide-react';
import React from 'react';

/**
 * Properti untuk komponen DownloadButton.
 */
export interface DownloadButtonProps {
  /** URL atau path relatif dari file yang akan diunduh */
  fileUrl: string;
  /** Nama file yang akan disimpan di perangkat pengguna */
  fileName: string;
  /** Teks label yang muncul pada tombol */
  label?: string;
  /** Opsional tambahan kelas CSS untuk kustomisasi tampilan */
  className?: string;
}

/**
 * Komponen tombol aksi (Call to Action) khusus untuk mengunduh file fisik.
 * Dibangun menggunakan tag anchor HTML bawaan agar eksekusi pengunduhan
 * berjalan secara native di browser tanpa memicu routing Next.js.
 * 
 * @param {DownloadButtonProps} props - Properti komponen
 * @returns {JSX.Element} Elemen tombol unduh dengan ikon
 */
export default function DownloadButton({
  fileUrl,
  fileName,
  label = 'Download',
  className = '',
}: DownloadButtonProps): JSX.Element {
  return (
    <a
      href={fileUrl}
      download={fileName}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary-hover hover:-translate-y-1 hover:shadow-md transition-all duration-300 ${className}`}
      aria-label={`Download ${fileName}`}
    >
      <Download size={18} />
      <span>{label}</span>
    </a>
  );
}

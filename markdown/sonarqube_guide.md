# Panduan Integrasi SonarQube untuk Proyek Next.js / TypeScript

Tentu saja bisa! SonarQube sangat mendukung aplikasi berbasis JavaScript dan TypeScript (seperti Next.js). SonarQube digunakan untuk melakukan *Static Code Analysis* guna menemukan *bug*, *code smells*, dan kerentanan keamanan (*security vulnerabilities*).

Berikut adalah langkah-langkah untuk mengintegrasikan SonarQube ke dalam aplikasi ini.

## Prasyarat
1. **SonarQube Server**: Anda harus memiliki server SonarQube yang sedang berjalan (bisa di lokal via Docker, di server sendiri, atau menggunakan SonarCloud).
2. **Java (JRE/JDK)**: Sonar Scanner membutuhkan Java terinstal di perangkat yang akan menjalankan pemindaian (jika menjalankan *scanner* secara lokal).

## Langkah 1: Buat File Konfigurasi SonarQube
Di direktori paling luar (root) proyek `kaffolio` ini, buatlah sebuah file bernama `sonar-project.properties`.

Isi file `sonar-project.properties` tersebut dengan konfigurasi berikut:

```properties
# Kunci proyek yang unik di SonarQube
sonar.projectKey=kaffolio-web
# Nama proyek yang akan muncul di dashboard SonarQube
sonar.projectName=Kaffolio Web Portfolio

# Tentukan versi proyek Anda (opsional)
sonar.projectVersion=1.0

# Direktori sumber (source code) yang akan di-scan
sonar.sources=src

# (Opsional) Jika Anda memiliki file test, tambahkan direktorinya di sini
# sonar.tests=__tests__

# Ekstensi file yang akan dipindai
sonar.exclusions=node_modules/**, .next/**, out/**, build/**, public/**, **/*.css

# Jika menggunakan TypeScript, SonarQube butuh informasi tipe data (tsconfig.json)
# agar analisanya lebih akurat.
sonar.typescript.tsconfigPath=tsconfig.json

# Encoding file
sonar.sourceEncoding=UTF-8
```

## Langkah 2: Cara Menjalankan Sonar Scanner

Ada beberapa cara untuk menjalankan analisis SonarQube:

### Opsi A: Menggunakan NPM package `sonarqube-scanner` (Paling Mudah untuk Lokal)

Anda bisa menambahkan *scanner* berbasis Node.js ke proyek Anda.

1. Install *package* tersebut sebagai *development dependency*:
   ```bash
   npm install -D sonarqube-scanner
   ```

2. Tambahkan script di `package.json` Anda:
   ```json
   "scripts": {
     // script lain...
     "sonar": "node sonar.js"
   }
   ```

3. Buat file `sonar.js` di root proyek dengan isi berikut:
   ```javascript
   const scanner = require('sonarqube-scanner').default;

   scanner(
     {
       serverUrl: "http://localhost:9000", // Ganti dengan URL SonarQube Anda
       token: "MASUKKAN_TOKEN_SONARQUBE_ANDA_DI_SINI", 
       options: {
         "sonar.projectKey": "kaffolio-web",
         "sonar.sources": "src",
         "sonar.exclusions": "node_modules/**, .next/**, out/**, public/**",
       },
     },
     () => process.exit()
   );
   ```

4. Jalankan scan:
   ```bash
   npm run sonar
   ```

### Opsi B: Menggunakan SonarScanner CLI (Resmi dari SonarQube)
1. Unduh **SonarScanner CLI** dari situs resmi SonarQube dan ekstrak ke komputer Anda.
2. Tambahkan lokasi folder `bin` dari SonarScanner ke *Environment Variable* `PATH` di OS Anda.
3. Buka terminal di folder root proyek ini, lalu jalankan perintah:
   ```bash
   sonar-scanner -Dsonar.login="MASUKKAN_TOKEN_SONARQUBE_ANDA_DI_SINI" -Dsonar.host.url="http://localhost:9000"
   ```

### Opsi C: Menggunakan CI/CD (GitHub Actions / GitLab CI)
Jika kode Anda berada di GitHub, cara paling umum di dunia profesional adalah memindainya secara otomatis setiap kali ada proses *push* atau *pull request* (PR).

Contoh file konfigurasi `.github/workflows/sonar.yml`:

```yaml
name: SonarQube Analysis
on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  sonarqube:
    name: SonarQube
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0  # SonarQube membutuhkan history lengkap

      - name: SonarQube Scan
        uses: SonarSource/sonarqube-scan-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
```

## Melihat Hasil

Setelah *scanner* berhasil dijalankan, buka halaman dashboard SonarQube Anda (misalnya `http://localhost:9000`). Anda akan melihat proyek "Kaffolio Web Portfolio" di sana beserta hasil analisis kualitas kode, seperti:
- **Bugs**
- **Vulnerabilities**
- **Code Smells**
- **Coverage**
- **Duplications**

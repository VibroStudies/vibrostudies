# Installationsanleitung
### Voraussetzung: 
1. NodeJS und npm installieren: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

### WebApp:
1. Installiere AngularCLI 10.1.2 (`npm i @angular/cli@10.1.2`)
2. Führe `npm i` unter `Implementation/vibrostudies/` aus (kann etwas länger dauern)
3. Unter `Implementation/vibrostudies/src/app/app-settings.ts` Voreinstellung `*` in Variable `baseURL` mit passender Backend-URL ersetzen (Beispiel: `https://api.example.com`)
4. Führe `ng build` unter `Implementation/vibrostudies/` aus
5. Generierter Ordner unter `Implementation/vibrostudies/dist/` als Webserver hosten (kann auch kopiert/verschoben werden)

### Django:
1. Installiere Django und Pip: https://docs.djangoproject.com/en/3.1/topics/install/#install-the-django-code
2. Installiere benötigte Packages: Führe `pip install -r requirements.txt` unter `Implementation/vibrostudies-backend/` aus
4. Unter `Implementation/vibrostudies-backend/vibrostudies/settings.py` in Zeile 28 zu `ALLOWED_HOSTS` die passende Server-URL einfügen
5. Um den Server zu starten, führe `gunicorn -c gunicorn.conf.py vibrostudies.wsgi` aus

### Android APK mit Google Play erzeugen:
Letzten Release direkt herunterladen: [Google Drive](https://drive.google.com/file/d/1St1Zr9Tzu_mZQzIk67ukpzAzeuBISBUj/view?usp=sharing)

1. Installiere Nativescript 7.0.8 (`npm i nativescript@7.0.8`)
2. Führe `npm i` unter `Implementation/vibrostudies/` aus (kann etwas länger dauern)
3. Führe `ns build` android unter `Implementation/vibrostudies/` aus
4. Die APK befindet sich unter `Implementation/vibrostudies/platforms/android/app/build/outputs/apk/debug/app-debug.apk`

### Android APK mit Google Play erzeugen:
1. Installiere Nativescript 7.0.8 (`npm i nativescript@7.0.8`)
2. https://docs.nativescript.org/tooling/publishing/publishing-android-apps
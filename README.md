# Sito del Dott. Riccardo Prezioso

Sito vetrina statico del Dott. Riccardo Prezioso, Fisiatra Interventista.

## Struttura

- `site/`: sito pubblico distribuito tramite GitHub Pages.
- `site/assets/css/`: fogli di stile.
- `site/assets/js/`: eventuali script locali.
- `site/assets/images/`: fotografie e immagini definitive.
- `Documenti/`: fonti e materiali normalizzati, mantenuti soltanto in locale.
- `Output/`: analisi e documenti di progetto, mantenuti soltanto in locale.
- `_arrivi/`: area temporanea per nuovi materiali, mantenuta vuota e non versionata.

## Anteprima locale

Da questa cartella:

```bash
python3 -m http.server 8000 --directory site
```

Aprire quindi <http://localhost:8000/>.

## Pubblicazione

Il workflow `.github/workflows/deploy-pages.yml` pubblica esclusivamente il contenuto di `site/` tramite GitHub Pages. Il dominio previsto è `www.riccardoprezioso.it`, già dichiarato in `site/CNAME`.

Prima della pubblicazione definitiva:

1. sostituire tutti i placeholder fotografici;
2. completare e verificare la bibliografia delle prestazioni;
3. completare privacy policy, cookie policy e gestione del consenso per gli script MioDottore;
4. rimuovere il blocco temporaneo all'indicizzazione da `robots.txt` e dai meta tag `robots`;
5. configurare GitHub Pages per usare GitHub Actions;
6. configurare DNS e nameserver del dominio su Aruba.


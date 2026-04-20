# KPI: Reklamationsquote

## User Story

Als Qualitätsmanager möchte ich die monatliche Reklamationsquote (Anzahl Reklamationen / Gesamtbestellungen × 100) aus SAP abrufen können, damit ich frühzeitig Qualitätsprobleme erkenne und bei Überschreitung von 5% automatisch per E-Mail benachrichtigt werde.

---

## KPI-Details

| Attribut | Wert |
|---|---|
| **Name** | Reklamationsquote |
| **Definition** | Anzahl Reklamationen / Gesamtbestellungen × 100 |
| **Datenquelle** | ERP-System (SAP) |
| **Einheit** | Prozent (%) |
| **Zielwert** | < 2% |
| **Warnschwelle** | > 5% |
| **Aktualisierung** | Monatlich |
| **Owner** | Qualitätsmanagement-Abteilung |
| **Sichtbarkeit** | Management & QM-Team |
| **Alerts** | E-Mail-Benachrichtigung bei > 5% |
| **Sonstiges** | Aufschlüsselung nach Lieferant gewünscht |

---

## Akzeptanzkriterien

- KPI wird monatlich aus SAP berechnet und aktualisiert
- Zielwert < 2%, Warnschwelle > 5%
- Sichtbar für Management & QM-Team
- Alert via E-Mail bei Überschreitung der Warnschwelle
- Aufschlüsselung nach Lieferant vorhanden

---

*Jira: KAN-7*

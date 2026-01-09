// frontend/src/components/ui/README.md

# Atomic UI Components Library

Diese Komponenten-Bibliothek enthält wiederverwendbare, theme-aware UI-Komponenten.

## Komponenten

### Modal
Vollständig anpassbares Modal mit Overlay, Escape-Key-Support und optionalem Close-Button.

**Props:**
- `isOpen: boolean` - Modal-Sichtbarkeit
- `onClose: () => void` - Callback beim Schließen
- `title?: string` - Optional: Modal-Titel
- `children: React.ReactNode` - Modal-Inhalt
- `size?: 'sm' | 'md' | 'lg' | 'xl'` - Modal-Größe (default: 'md')
- `showCloseButton?: boolean` - Close-Button anzeigen (default: true)
- `closeOnOverlayClick?: boolean` - Bei Overlay-Klick schließen (default: true)

**Beispiel:**
```tsx
import { Modal } from '@/components/ui';

const [isOpen, setIsOpen] = useState(false);

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Mein Modal" size="lg">
  <p>Modal-Inhalt hier</p>
</Modal>
```

---

### Toast
Auto-dismissable Benachrichtigungen mit verschiedenen Typen und Positionen.

**Props:**
- `message: string` - Benachrichtigungstext
- `type?: 'success' | 'error' | 'warning' | 'info'` - Toast-Typ (default: 'info')
- `duration?: number` - Auto-Close-Zeit in ms (default: 3000, 0 = kein Auto-Close)
- `onClose: () => void` - Callback beim Schließen
- `position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'` - Position (default: 'top-right')

**Beispiel mit useToast Hook:**
```tsx
import { useToast } from '@/hooks/useToast';
import { Toast } from '@/components/ui';

const { toasts, success, error, hideToast } = useToast();

// Toast anzeigen
success('Operation erfolgreich!');
error('Ein Fehler ist aufgetreten');

// Toasts rendern
{toasts.map(toast => (
  <Toast key={toast.id} {...toast} onClose={() => hideToast(toast.id)} />
))}
```

---

### Dialog
Bestätigungs-Dialoge mit verschiedenen Varianten (danger, warning, info).

**Props:**
- `isOpen: boolean` - Dialog-Sichtbarkeit
- `onClose: () => void` - Callback bei Abbrechen
- `onConfirm: () => void` - Callback bei Bestätigung
- `title: string` - Dialog-Titel
- `message: string` - Dialog-Nachricht
- `confirmText?: string` - Bestätigungs-Button-Text (default: 'Bestätigen')
- `cancelText?: string` - Abbrechen-Button-Text (default: 'Abbrechen')
- `variant?: 'danger' | 'warning' | 'info'` - Dialog-Variante (default: 'info')
- `isLoading?: boolean` - Lade-Status (default: false)

**Beispiel:**
```tsx
import { Dialog } from '@/components/ui';

const [showDialog, setShowDialog] = useState(false);

<Dialog
  isOpen={showDialog}
  onClose={() => setShowDialog(false)}
  onConfirm={handleDelete}
  title="Eintrag löschen?"
  message="Diese Aktion kann nicht rückgängig gemacht werden."
  variant="danger"
  confirmText="Löschen"
/>
```

---

### Spinner
Lade-Indikator mit verschiedenen Größen und Farben, optional fullscreen.

**Props:**
- `size?: 'sm' | 'md' | 'lg' | 'xl'` - Spinner-Größe (default: 'md')
- `color?: 'primary' | 'white' | 'gray'` - Spinner-Farbe (default: 'primary')
- `fullScreen?: boolean` - Fullscreen-Overlay (default: false)
- `label?: string` - Optional: Label unter dem Spinner

**Beispiel:**
```tsx
import { Spinner } from '@/components/ui';

// Inline
<Spinner size="md" color="primary" />

// Fullscreen mit Label
<Spinner fullScreen label="Daten werden geladen..." />
```

---

## Theme-Awareness

Alle Komponenten nutzen den `useTheme` Hook aus `context/ThemeContext` und passen sich automatisch an Light/Dark-Mode an.

## Accessibility

- Modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- Dialog: `role="alertdialog"`, `aria-modal="true"`
- Spinner: `role="status"`, `aria-label`
- Keyboard-Support: Escape-Key zum Schließen von Modal/Dialog
- Focus-Management: Body-Scroll wird bei geöffnetem Modal deaktiviert

## TypeScript

Alle Komponenten sind vollständig mit TypeScript typisiert und bieten vollständige IntelliSense-Unterstützung.

'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy, Check, AlertTriangle } from 'lucide-react';

interface CredentialsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  credentials: {
    projectName: string;
    loginUrl: string;
    email: string;
    password: string;
  };
}

export default function CredentialsDialog({
  open,
  onOpenChange,
  credentials,
}: CredentialsDialogProps) {
  const [copied, setCopied] = useState(false);

  const credentialsText = `Portal de Feedback — ${credentials.projectName}
URL: ${credentials.loginUrl}
Email: ${credentials.email}
Contraseña: ${credentials.password}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(credentialsText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Credenciales del cliente</DialogTitle>
          <DialogDescription>
            Comparte estas credenciales con tu cliente para que acceda al portal
            de feedback.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border bg-muted/50 p-4 font-mono text-sm whitespace-pre-wrap">
          {credentialsText}
        </div>

        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-700 dark:text-amber-300">
            Guarda esta contraseña, no se puede recuperar después.
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copiado
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copiar al portapapeles
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const commentFormSchema = z.object({
  content: z
    .string()
    .min(1, 'El comentario es requerido')
    .max(2000, 'Maximo 2000 caracteres'),
  priority: z.enum(['low', 'medium', 'high']),
});

type CommentFormValues = z.infer<typeof commentFormSchema>;

interface CommentFormProps {
  /** x: % of width, y: viewport px, viewportPctY: % of viewport height */
  position: { x: number; y: number; viewportPctY: number };
  onSubmit: (data: { content: string; priority: 'low' | 'medium' | 'high' }) => void;
  onCancel: () => void;
}

export function CommentForm({ position, onSubmit, onCancel }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: '',
      priority: 'medium',
    },
  });

  const priority = watch('priority');

  // Smart flip: openLeft if click is past 70% width, openUp if past 70% viewport height
  const openLeft = position.x > 70;
  const openUp = position.viewportPctY > 70;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.15 }}
      className="absolute z-50 w-72"
      style={{
        left: openLeft ? undefined : `${position.x}%`,
        right: openLeft ? `${100 - position.x}%` : undefined,
        top: `${position.y}px`,
        transform: openUp ? 'translateY(calc(-100% - 16px))' : undefined,
        marginLeft: openLeft ? undefined : '16px',
        marginRight: openLeft ? '16px' : undefined,
        marginTop: openUp ? undefined : '16px',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4 shadow-2xl">
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="space-y-3"
        >
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Comentario</Label>
            <Textarea
              {...register('content')}
              placeholder="Describe el cambio que necesitas..."
              className="min-h-[80px] resize-none border-zinc-700 bg-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-amber-500/50"
              autoFocus
            />
            {errors.content && (
              <p className="text-xs text-red-400">{errors.content.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Prioridad</Label>
            <Select
              value={priority}
              onValueChange={(val) =>
                setValue('priority', val as 'low' | 'medium' | 'high')
              }
            >
              <SelectTrigger className="h-8 border-zinc-700 bg-zinc-800 text-sm text-zinc-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-zinc-700 bg-zinc-900">
                <SelectItem value="low" className="text-zinc-100 focus:bg-zinc-800">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Baja
                  </span>
                </SelectItem>
                <SelectItem value="medium" className="text-zinc-100 focus:bg-zinc-800">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    Media
                  </span>
                </SelectItem>
                <SelectItem value="high" className="text-zinc-100 focus:bg-zinc-800">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    Alta
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="flex-1 text-zinc-400 hover:text-zinc-100"
            >
              <X className="mr-1.5 h-3.5 w-3.5" />
              Cancelar
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className="flex-1 bg-amber-500 text-zinc-950 hover:bg-amber-400"
            >
              <Send className="mr-1.5 h-3.5 w-3.5" />
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

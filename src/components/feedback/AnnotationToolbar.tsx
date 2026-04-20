'use client';

import { MousePointer2, MapPin, PanelRight, LogOut, MessageSquare } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface AnnotationToolbarProps {
  mode: 'navigate' | 'annotate';
  onModeChange: (mode: 'navigate' | 'annotate') => void;
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
  pendingCount: number;
  clientName: string;
  projectUrl?: string;
  onLogout: () => void;
}

export function AnnotationToolbar({
  mode,
  onModeChange,
  sidebarOpen,
  onSidebarToggle,
  pendingCount,
  clientName,
  projectUrl,
  onLogout,
}: AnnotationToolbarProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4">
        {/* Left: Mode toggle */}
        <div className="flex items-center gap-3">
          <ToggleGroup
            type="single"
            value={mode}
            onValueChange={(val) => {
              if (val) onModeChange(val as 'navigate' | 'annotate');
            }}
            className="gap-0 rounded-lg border border-zinc-700 bg-zinc-800 p-0.5"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value="navigate"
                  aria-label="Modo navegacion"
                  className="h-8 rounded-md px-3 data-[state=on]:bg-zinc-600 data-[state=on]:text-zinc-100"
                >
                  <MousePointer2 className="h-4 w-4" />
                  <span className="ml-1.5 hidden text-sm sm:inline">Navegar</span>
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Navega el sitio normalmente</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value="annotate"
                  aria-label="Modo anotacion"
                  className="h-8 rounded-md px-3 data-[state=on]:bg-amber-500/20 data-[state=on]:text-amber-400"
                >
                  <MapPin className="h-4 w-4" />
                  <span className="ml-1.5 hidden text-sm sm:inline">Anotar</span>
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Haz clic para dejar un comentario</p>
              </TooltipContent>
            </Tooltip>
          </ToggleGroup>
        </div>

        {/* Center: URL display */}
        <div className="hidden items-center gap-2 md:flex">
          <Badge
            variant="outline"
            className="max-w-xs truncate border-zinc-700 bg-zinc-800 px-3 py-1 font-mono text-xs text-zinc-400"
          >
            {projectUrl || 'Cargando...'}
          </Badge>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Pending count */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={onSidebarToggle}
                className="relative text-zinc-400 hover:text-zinc-100"
              >
                <MessageSquare className="h-4 w-4" />
                {pendingCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-zinc-950">
                    {pendingCount}
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{pendingCount} comentarios pendientes</p>
            </TooltipContent>
          </Tooltip>

          {/* Sidebar toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={onSidebarToggle}
                className={`text-zinc-400 hover:text-zinc-100 ${sidebarOpen ? 'bg-zinc-800' : ''}`}
              >
                <PanelRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{sidebarOpen ? 'Ocultar' : 'Mostrar'} panel</p>
            </TooltipContent>
          </Tooltip>

          {/* Client name + logout */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="ml-1 gap-2 text-zinc-300 hover:text-zinc-100"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-xs font-semibold text-amber-400">
                  {clientName?.charAt(0)?.toUpperCase() || 'C'}
                </div>
                <span className="hidden text-sm sm:inline">{clientName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="border-zinc-700 bg-zinc-900"
            >
              <DropdownMenuItem
                onClick={onLogout}
                className="text-zinc-300 focus:bg-zinc-800 focus:text-zinc-100"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar sesion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </TooltipProvider>
  );
}

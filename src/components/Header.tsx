import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Logo from '@/assets/logo_claro.svg';
import { User } from 'lucide-react';

const Header: React.FC = () => {
  const NavButton: React.FC<{ to: string; label: string }> = ({ to, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'px-4 py-2 rounded-md text-sm font-semibold transition-colors',
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'text-foreground/70 hover:bg-secondary hover:text-foreground'
        )
      }
    >
      {label}
    </NavLink>
  );

  return (
    <header className="w-full bg-card py-3 border-b shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <img src={Logo} alt="MedSimples Logo" className="h-8" />
          <nav className="flex items-center gap-2">
            <NavButton to="/" label="Cockpit" />
            <NavButton to="/indicadores" label="Indicadores" />
            <NavButton to="/analise-desvio" label="Análise Desvio" />
            <NavButton to="/contratos" label="Contratos" />
            <NavButton to="/plano-acao" label="Plano de Ação" />
            <NavButton to="/gestao-ganhos" label="Gestão Ganhos" />
            <NavButton to="/phasing-ganho" label="Phasing Ganho" />
            <NavButton to="/governanca" label="Governança" />
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">Stephen</p>
            <p className="text-xs text-muted-foreground">MedSimples</p>
          </div>
          <button className="rounded-full w-10 h-10 bg-secondary flex items-center justify-center border">
            <User className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

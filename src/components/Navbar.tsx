import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMenuItems } from "@/hooks/useMenuItems";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { menuItems, getParentItems, getChildItems } = useMenuItems('main');

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/src/assets/anagata-logo-large.webp" 
                alt="Anagata IT Solutions Logo" 
                className="h-10 w-10"
                width="40"
                height="40"
                loading="lazy"
              />
              <span className="font-bold text-xl">Anagata IT Solutions</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {getParentItems().map((item) => {
              const childItems = getChildItems(item.id);
              
              if (childItems.length > 0) {
                return (
                  <DropdownMenu key={item.id}>
                    <DropdownMenuTrigger className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105">
                      {item.title} <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 hover:rotate-180" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Link to={item.url}>{item.title}</Link>
                      </DropdownMenuItem>
                      {childItems.map((child) => (
                        <DropdownMenuItem key={child.id} asChild>
                          <Link to={child.url}>{child.title}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }
              
              return (
                <Link
                  key={item.id}
                  to={item.url}
                  className={`text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 ${
                    isActive(item.url) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/contact">
              <Button variant="outline" size="sm" className="btn-glow animate-pulse">
                Get Consultation
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
                {getParentItems().map((item) => {
                  const childItems = getChildItems(item.id);
                  
                  return (
                    <div key={item.id}>
                      <Link
                        to={item.url}
                        className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </Link>
                      
                      {/* Mobile Dropdown Items */}
                      {childItems.length > 0 && (
                        <div className="ml-4 mt-1 space-y-1">
                          {childItems.map((child) => (
                            <Link
                              key={child.id}
                              to={child.url}
                              className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary"
                              onClick={() => setIsOpen(false)}
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                <div className="flex flex-col space-y-2 px-3 py-2">
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full btn-glow">
                      Get Consultation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
      </div>
    </nav>
  );
};
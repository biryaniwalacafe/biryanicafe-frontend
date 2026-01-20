import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { mockMenuItems } from "@/lib/mockData";
import { Card } from "@/components/ui/card";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = query.length > 0
    ? mockMenuItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for dishes..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="pl-10 pr-4"
          data-testid="input-search"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute top-full mt-2 w-full z-50 p-2">
          {suggestions.map((item) => (
            <button
              key={item.id}
              className="w-full text-left px-3 py-2 rounded-md hover-elevate flex items-center gap-3"
              onClick={() => {
                handleSearch(item.name);
                setShowSuggestions(false);
              }}
              data-testid={`suggestion-${item.id}`}
            >
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.category}</p>
              </div>
              <span className="text-primary font-semibold">${item.price}</span>
            </button>
          ))}
        </Card>
      )}
    </div>
  );
}

import Checkbox from "../shared/Checkbox";
import Input from "../shared/Input";
import Select from "../shared/Select";
import { NAMIBIA_LOCATIONS } from "@/data/namibiaLocations";
import { DEMO_CATEGORIES } from "@/data/taxonomies";

const businessSizes = [
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Large", value: "large" },
];

const services = [
  "Restaurant", "Hotel", "Retail", "Finance", "Transport", "Education", "Health", "IT", "Consulting", "Other"
];

const ratings = [
  { label: "Any", value: "any" },
  { label: "4+ stars", value: "4" },
  { label: "3+ stars", value: "3" },
  { label: "2+ stars", value: "2" },
];

const BusinessSidebarFilters = ({ onFilter, selectedCategory }: { onFilter?: (filters: any) => void, selectedCategory: string }) => {
  return (
    <aside className="w-full bg-white dark:bg-neutral-900 rounded-2xl shadow-md border border-neutral-100 dark:border-neutral-800 p-6 space-y-6">
      <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
        Filter Businesses
      </h3>

      {/* Search */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300">
          Search by name
        </label>
        <Input placeholder="Type a business name..." />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300">
          Category
        </label>
        <Select>
          <option value="">All categories</option>
          {DEMO_CATEGORIES.map(c => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </Select>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300">
          Location
        </label>
        <Select>
          <option value="">All locations</option>
          {NAMIBIA_LOCATIONS.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </Select>
      </div>

      {/* Business Size */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300">
          Business Size
        </label>
        <Select>
          <option value="">Any size</option>
          {businessSizes.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </Select>
      </div>

      {/* Services */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300">
          Services Offered
        </label>
        <Select>
          <option value="">Any service</option>
          {services.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </Select>
      </div>

      {/* Rating */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300">
          Minimum Rating
        </label>
        <Select>
          {ratings.map(r => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </Select>
      </div>

      {/* Checkboxes */}
      <div className="border-t pt-4 border-neutral-200 dark:border-neutral-700 space-y-3">
        <Checkbox name="openNow" label="Show only open businesses" />
        <Checkbox name="hasWebsite" label="Show only businesses with website" />
      </div>
    </aside>
  );
};

export default BusinessSidebarFilters;

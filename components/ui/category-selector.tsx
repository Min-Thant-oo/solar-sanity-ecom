// "use client";

// import { Category } from "@/sanity.types";
// import { useRouter, usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import { ChevronsUpDown, Check } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "./button";
// import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandInput } from "./command";
// import { Popover, PopoverContent, PopoverTrigger } from "./popover";

// interface CategorySelectorProps {
//     categories: Category[];
// }

// export function CategorySelectorComponent({
//     categories,
// }: CategorySelectorProps) {
//     const [open, setOpen] = useState(false);
//     const [value, setValue] = useState<string>("");
//     const [inputValue, setInputValue] = useState("");
//     const router = useRouter();
//     const pathname = usePathname();

//     // Update `value` based on the URL when the component first loads
//     useEffect(() => {
//         const currentCategorySlug = pathname.split("/").pop();
//         const matchedCategory = categories.find(
//             (category) => category.slug?.current === currentCategorySlug
//         );
//         if (matchedCategory) {
//             setValue(matchedCategory._id);
//         }
//     }, [pathname, categories]);

//     // Filter categories based on input
//     const filteredCategories = categories.filter((category) =>
//         category.title?.toLowerCase().includes(inputValue.toLowerCase())
//     );

//     return (
//         <Popover open={open} onOpenChange={setOpen}>
//             <PopoverTrigger asChild>
//                 <Button
//                     variant="outline"
//                     role="combobox"
//                     aria-expanded={open}
//                     className="w-full max-w-full relative flex justify-center sm:justify-between sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 hover:text-white text-white font-bold py-2 px-4 rounded"
//                 >
//                     {value
//                         ? categories.find((category) => category._id === value)?.title
//                         : "Filter by Category"}
//                     <ChevronsUpDown className="h-4 w-4 shrink-0" />
//                 </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-full p-0">
//                 <Command>
//                     <CommandInput
//                         placeholder="Search category..."
//                         value={inputValue}
//                         // onValueChange={setInputValue}
//                         onChange={(e) => setInputValue(e.target.value)}
//                     />
//                     <CommandList>
//                         <CommandEmpty>No category found.</CommandEmpty>
//                         <CommandGroup>
//                             {filteredCategories.map((category) => (
//                                 <CommandItem
//                                     key={category._id}
//                                     value={category.title}
//                                     onSelect={() => {
//                                         setValue(category._id);
//                                         setInputValue(""); // Reset input after selection
//                                         router.push(`/categories/${category.slug?.current}`);
//                                         setOpen(false);
//                                     }}
//                                 >
//                                     {category.title}
//                                     <Check 
//                                         className={cn(
//                                             "ml-auto h-4 w-4",
//                                             value === category._id ? "opacity-100" : "opacity-0"
//                                         )} 
//                                     />
//                                 </CommandItem>
//                             ))}
//                         </CommandGroup>
//                     </CommandList>
//                 </Command>
//             </PopoverContent>
//         </Popover>
//     );
// }





"use client";

import { Category } from "@/sanity.types";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandInput } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface CategorySelectorProps {
    categories: Category[];
}

export function CategorySelectorComponent({
    categories,
}: CategorySelectorProps) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string>("");
    const [search, setSearch] = useState("");
    const router = useRouter();
    const pathname = usePathname();

    // Update `value` based on the URL when the component first loads
    useEffect(() => {
        const currentCategorySlug = pathname.split("/").pop();
        const matchedCategory = categories.find(
            (category) => category.slug?.current === currentCategorySlug
        );
        if (matchedCategory) {
            setValue(matchedCategory._id);
        }
    }, [pathname, categories]);

    // Filter categories based on search
    const filteredCategories = categories.filter((category) =>
        category.title?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full max-w-full relative flex justify-center sm:justify-between sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 hover:text-white text-white font-bold py-2 px-4 rounded"
                >
                    {value
                        ? categories.find((category) => category._id === value)?.title
                        : "Filter by Category"}
                    <ChevronsUpDown className="h-4 w-4 shrink-0" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput 
                        placeholder="Search category..."
                        onValueChange={setSearch}
                    />
                    <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                            {filteredCategories.map((category) => (
                                <CommandItem
                                    key={category._id}
                                    value={category.title}
                                    onSelect={() => {
                                        setValue(category._id);
                                        setSearch(""); // Reset search after selection
                                        router.push(`/categories/${category.slug?.current}`);
                                        setOpen(false);
                                    }}
                                >
                                    {category.title}
                                    <Check 
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === category._id ? "opacity-100" : "opacity-0"
                                        )} 
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Newsletter() {
    return (
        <section className="bg-primary/5 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 border border-primary/10 mb-12 transition-all">
            <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">
                    Yangi chegirmalar haqida birinchilardan bo'lib biling!
                </h3>
                <p className="text-slate-500 text-sm">
                    Elektron pochtangizni qoldiring va birinchi xaridingiz uchun 10% chegirma kuponiga ega bo'ling.
                </p>
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                <Input
                    type="email"
                    placeholder="Email manzilingiz"
                    className="px-5 py-5 rounded-lg border border-primary/20 bg-white focus-visible:ring-2 focus-visible:ring-primary min-w-[280px] text-sm"
                />
                <Button className="bg-primary text-primary-foreground px-6 py-5 rounded-lg font-bold hover:bg-primary/90 hover:shadow-md transition-all text-sm whitespace-nowrap h-auto">
                    A'zo bo'lish
                </Button>
            </div>
        </section>
    );
}

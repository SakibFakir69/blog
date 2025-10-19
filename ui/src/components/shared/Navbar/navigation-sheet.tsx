import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavMenu } from "./nav-menu";
import { Logo } from "./logo";


export const NavigationSheet = ({isUser}:{isUser:boolean}) => {
 
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        {/* <Logo />
         */}
         <Logo/>
         
        <NavMenu isUser={isUser} orientation="vertical" className="mt-12" />
      </SheetContent>
    </Sheet>
  );
};

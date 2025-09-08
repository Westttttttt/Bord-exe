import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BsPlus } from "react-icons/bs";

export default function CreateNewBoard() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <BsPlus className="w-5 h-5" />
                    New Board
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md rounded-2xl shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold tracking-tight">
                        Create a New Board
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        Organize your ideas, collaborate with your team, and
                        share resources in a single space.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-6 py-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="title" className="text-sm font-medium">
                            Board Title
                        </Label>
                        <Input
                            id="title"
                            placeholder="e.g. Project Kickoff, Study Group"
                            className="rounded-lg"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label
                            htmlFor="description"
                            className="text-sm font-medium"
                        >
                            Description{" "}
                            <span className="text-muted-foreground">
                                (optional)
                            </span>
                        </Label>
                        <Input
                            id="description"
                            placeholder="Briefly describe the purpose of this board"
                            className="rounded-lg"
                        />
                    </div>
                </div>

                <DialogFooter className="flex gap-2 sm:justify-end">
                    <DialogClose asChild>
                        <Button variant="outline" className="rounded-lg">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit" className="rounded-lg">
                        Create Board
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

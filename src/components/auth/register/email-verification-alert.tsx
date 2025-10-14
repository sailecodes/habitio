import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IEmailVerificationAlertProps } from "@/lib/interfaces";

export default function EmailVerificationAlert({
  isDialogOpen,
  setIsDialogOpen,
}: IEmailVerificationAlertProps) {
  return (
    <AlertDialog
      open={isDialogOpen}
      onOpenChange={() => setIsDialogOpen((prev) => !prev)}>
      <AlertDialogContent className="z-100">
        <AlertDialogHeader>
          <AlertDialogTitle>✅ Almost there! Just one more step.</AlertDialogTitle>
          <AlertDialogDescription>
            We sent an email verification to your inbox. Please confirm your email via the link
            embedded in it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="hover-translate hover-pointer">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

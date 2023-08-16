import { insertNoteSchema } from "@/db/notes/validation";

export const validateForm = (
  data: Record<string, any>, 
  setNameError: React.Dispatch<React.SetStateAction<string>>, 
  setContentError: React.Dispatch<React.SetStateAction<string>>
) => {
  const validationResponse = insertNoteSchema.safeParse(data)

  if (!validationResponse.success) {
    setNameError(validationResponse.error.flatten().fieldErrors.name?.join(' ') || '');
    setContentError(validationResponse.error.flatten().fieldErrors.content?.join(' ') || '');

    return false;
  }

  return true;
}
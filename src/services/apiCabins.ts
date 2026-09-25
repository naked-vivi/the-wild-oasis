import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase
        .from('cabins')
        .select('*')

    if (error) {
        console.error(error)
        throw new Error("Cabins cannot be loaded")
    }
    return data;
}

export async function createCabin(newCabin, id?: number) {
    const hasImagePath = typeof newCabin.image === "string" && newCabin.image.startsWith(supabaseUrl);

    //https://cabvaqbnxpmhcabizmle.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "")
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    //1. upload image
    // if (hasImagePath) return data;
    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);


    if (storageError) {
        console.error(storageError);
        throw new Error("Cabin image could not be uploaded");
    }

    //2. create cabin
    const query = id
        ? supabase.from("cabins").update({ ...newCabin, image: imagePath }).eq("id", id)
        : supabase.from("cabins").insert({ ...newCabin, image: imagePath });
    const { data, error } = await query.select();

    if (error) {
        console.error(error);
        throw new Error(id ? "Cabin could not be updated" : "Cabin could not be created");
    }
    return data;

}

export async function deleteCabin(id: number) {
    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)
        .select('id')

    if (error) {
        console.error(error)
        if (error.code === "23503") {
            throw new Error("This cabin cannot be deleted because it is linked to existing records, such as bookings.");
        }
        throw new Error(`Cabin could not be deleted: ${error.message}`)
    }
    if (!data?.length) {
        throw new Error("No cabin was deleted. It may already be removed, or your account may not have permission to delete it.");
    }
    return data;
}

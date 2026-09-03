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

export async function createCabin(newCabin) {
    //https://cabvaqbnxpmhcabizmle.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "")
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    //2. upload image
    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

    if (storageError) {
        console.error(storageError);
        throw new Error("Cabin image could not be uploaded");
    }

    //1. create cabin
    const { data, error } = await supabase
        .from('cabins')
        .insert([{ ...newCabin, image: imagePath }])
        .select()

    if (error) {
        console.error(error)
        throw new Error("Cabins cannot be created")
    }
    return data;

}

export async function deleteCabin(id: number) {
    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id) //change here

    if (error) {
        console.error(error)
        throw new Error("Cabins cannot be deleted")
    }
    return data;
}


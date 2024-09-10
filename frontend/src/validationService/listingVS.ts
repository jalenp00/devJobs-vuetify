import { ref } from 'vue';
import { validationListingSchema } from '../validations/CreateListingV';
import { CreateListing } from 'types/listing';


interface Errors {
  [key: string]: string;
}

// Declare user and errors refs
const listing = ref<CreateListing | null>(null);
const listingErrors = ref<Errors>({});

const validateField = async (field: string) => {
    if (!listing.value) {
        listingErrors.value[field] = 'User data is not available';
        return;
    }
    try {
        clearErrorKeyField(field);
        await validationListingSchema.validateAt(field, listing.value);
    } catch (error) {
        listingErrors.value[field] = (error as any).message; // Cast error to any for handling
    }
};

const validateSubmit = async () => {
    try {
        clearErrorKeys();
        await validationListingSchema.validate(listing.value, { abortEarly: false });
        return true;
    } catch (error) {
        if ((error as any).inner) {
            (error as any).inner.forEach(({ path, message }: { path: string, message: string }) => {
                listingErrors.value[path] = message;
            });
        }
    }
};

const clearErrorKeyField = (field: string) => {
    delete listingErrors.value[field];
}

const clearErrorKeys = () => {
    Object.keys(listingErrors.value).forEach(key => {
        delete listingErrors.value[key];
    });
}

export default {
    validateField,
    validateSubmit,
    listing,
    listingErrors
}
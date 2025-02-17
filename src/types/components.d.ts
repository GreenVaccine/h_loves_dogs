import { dogsType } from "@/types/store";

export type mainInitialValueType = {
  page: { number: number; perPage: number };
  selectBreeds: string[];
  age: { max: string; min: string };
  sort: string;
};

export type DogTableType = {
  sort: string;
  perPage: number;
  loading: boolean;
  dogs: dogsType[];
  handleSort: (event: string) => void;
  openModal: (event: dogsType) => void;
};

export type TableModalType = {
  modalOpen: boolean;
  closeModal: () => void;
  selectedDog: dogsType | null;
};

export type TableSearchType = {
  max: string;
  min: string;
  breedsLeng: number;
  selectBreeds: string[];
  handleMultiSelectOptions: Function;
  handleBreedsChange: (
    event: MultiValue<{ value: string; label: string }>
  ) => void;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<mainInitialValueType>>;
};

export type TablePaginationType = {
  page: number;
  total: number;
  perPage: number;
  breedsLeng: number;
  handlePageNumChange: (page: number) => void;
  handleGoPageNumber: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

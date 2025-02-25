export interface TeacherCreateType {
  id?: number;
  firstName?: string,
  lastName?: string,
  phone?: string,
  pinfl?: string,
  degree?: string,
  position?: string
}

export interface TeacherFilter {
  filter: Filter;
  paging: Paging;
}

export interface Filter {
  firstName?: string;
  lastName?: string;
}

export interface Paging {
  page: number;
  size: number;
}

export interface TeacherFilterData {
  data: {
    content: Content[];
    paging: Pagings;
  }
}

export interface TeacherImage {
  id: number;
  file: File | string;
}

export interface Content {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  pinfl: string;
  degree: string;
  position: string;
}

export interface Pagings {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
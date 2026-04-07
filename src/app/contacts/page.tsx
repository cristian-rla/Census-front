"use client";
import Table from "@/components/Table/table";
import Image from "next/image";
import contacts from "./contacts.json";

interface IFetch {
  filters?: {
    name: string;
    company: string;
    lastActivity: Date;
  };
  page: number;
  perPage: number;
}

function fetchContacts({ filters, page, perPage }: IFetch) {
  return contacts.filter((val, index) => {
    console.log(index + 1, (page - 1) * perPage + 1, page * perPage);
    return index + 1 >= (page - 1) * perPage + 1 && index + 1 <= page * perPage;
  });
}

interface Contact {
  contactInfo: {
    imgUrl: string;
    name: string;
    email: string;
  };
  company: string;
  //   status: "overdue" | "customer" | "completed" | "lead";
  status: string;
  lastActivity: string;
}

interface Column {
  key: keyof Contact | string;
  label: string;
  render?: (row: Contact) => React.ReactNode;
}

const colorPerStatus = {
  overdue: "bg-surface-error text-on-surface-error",
  customer: "bg-primary-4 text-surface-container-lowest",
  lead: "bg-neutral-2 text-on-surface-container",
};

// poner que los rows siempre sea obligatorio pero que en unos casos no se utilice
const columns: Column[] = [
  {
    key: "contactInfo",
    label: "Contact",
    render: (row) => {
      return (
        <div className="flex flex-row items-center gap-4 rounded-sm">
          <Image
            src={row.contactInfo.imgUrl}
            width={40}
            height={40}
            alt={`${row.contactInfo.name} profile pic`}
            className="object-cover rounded-lg"
          ></Image>
          <div className="flex flex-col gap-1">
            <p className="font-bold text-sm">{row.contactInfo.name}</p>
            <p className="text-xs">{row.contactInfo.email}</p>
          </div>
        </div>
      );
    },
  },
  { key: "company", label: "Company" },
  {
    key: "status",
    label: "Status",
    render: (row: Contact) => {
      return (
        <div
          className={`${colorPerStatus[row.status as keyof typeof colorPerStatus]} text-center w-fit px-4 text-sm tracking-tighter rounded-lg uppercase font-semibold`} // corregir esto, se ve horrible
        >
          {row.status}
        </div>
      );
    },
  },
  { key: "lastActivity", label: "Last Activity" },
  {
    key: "actions",
    label: "Actions",
    render: () => {
      return (
        <div className="w-full flex flex-row gap-2">
          <button className="flex-1 bg-primary-4 rounded-sm text-surface-container-lowest px-4 py-2">
            View
          </button>
          <button className="flex-1 bg-surface-container-high rounded-sm text-on-surface px-4 py-2">
            Message
          </button>
        </div>
      );
    },
  },
];

export default function Contacts() {
  const CONTACTS_PER_PAGE = 4;
  return (
    <section className="bg-background h-full p-8 justify-start items-start flex flex-col gap-8">
      <div className="flex flex-row w-full">
        <div className="flex flex-col flex-1 gap-4">
          <h2 className={`font-headline font-bold text-3xl `}>Contacts</h2>
          <p className="text-md text-gray-500 font-semibold">
            Manage your network
          </p>
        </div>
        <div className="flex flex-row gap-4 text-on-secondary-container font-semibold text-sm my-auto">
          <label className="flex flex-row items-center gap-2 px-4 py-2 bg-secondary-container  rounded-md ">
            <span className="material-symbols-outlined">filter_list</span>
            Filter
          </label>
          <label className="flex flex-row items-center gap-2 px-4 py-2 bg-secondary-container rounded-md ">
            <span className="material-symbols-outlined">ios_share</span>
            Export
          </label>
        </div>
      </div>
      <Table<Contact>
        fetchData={(page: number) =>
          fetchContacts({ page: page, perPage: CONTACTS_PER_PAGE })
        }
        columns={columns}
        totalRows={contacts.length}
        rowsPerPage={CONTACTS_PER_PAGE}
      />
    </section>
  );
}

import Table from "@/components/Table/table";

const employees = [
  {
    contact: "John Doe",
    company: "Acme Inc.",
    status: "555-1234",
    last_activity: "2 days ago",
  },
];

const columns = [
  { key: "contact", label: "Contact" },
  { key: "company", label: "Company" },
  { key: "status", label: "Status" },
  { key: "last_activity", label: "Last Activity" },
];

export default function Contacts() {
  return (
    <div className="bg-background h-full p-8 justify-start items-start flex flex-col gap-4">
      <h2 className={`font-headline font-bold text-3xl `}>Contacts</h2>
      <p className="text-lg text-gray-500">Manage your network</p>
      <Table data={employees} columns={columns} />
    </div>
  );
}

export const DashboardTable = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <table className="w-full text-sm">
        {children}
      </table>
    </div>
  );
};
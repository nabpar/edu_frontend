const Chip = ({ status,}) => {
    let colorClass;
    switch (status) {
      case 'DRAFT':
        colorClass = 'bg-blue-500';
        break;
      case 'REVIEW':
        colorClass = 'bg-orange-500';
        break;
      case 'REJECTED':
        colorClass = 'bg-red-500';
        break;
      case 'PUBLISHED':
        colorClass = 'bg-green-500';
        break;
      default:
        colorClass = 'bg-gray-500';
    }
  
    return (
      <div className={`inline-block rounded-full px-3 py-1 text-sm text-white ${colorClass} mr-2`}>
        {status}
      </div>
    );
  };
  
  export default Chip;
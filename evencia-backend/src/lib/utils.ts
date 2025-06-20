export const formatDateTime = (dateInput: string | Date) => {
  const dateObj = new Date(dateInput);

  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',  // e.g., 'Mon'
    month: 'short',    // e.g., 'Oct'
    day: 'numeric',    // e.g., '25'
    hour: 'numeric',   // e.g., '8'
    minute: 'numeric', // e.g., '30'
    hour12: true,      // 12-hour clock
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return {
    dateTime: dateObj.toLocaleString('en-US', dateTimeOptions),
    dateOnly: dateObj.toLocaleDateString('en-US', dateOptions),
    timeOnly: dateObj.toLocaleTimeString('en-US', timeOptions),
  };
};

export const formatPrice = (price: string) => {
  const amount = parseFloat(price);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: {
  params: string;
  keysToRemove: string[];
}) => {
  const currentUrl = new URL(params, window.location.origin);

  keysToRemove.forEach((key) => {
    currentUrl.searchParams.delete(key);
  });

  return currentUrl.pathname + currentUrl.search;
};

export const handleError = (error: unknown) => {
  console.error(error);
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error));
};

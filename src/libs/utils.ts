export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  };

  return date.toLocaleDateString("en-GB", options); // 'en-GB' gives "12 Jan 24"
}

export function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // If the date is in the past 60 seconds
  if (seconds < 60) {
    return "few seconds ago";
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  // If it's more than a month, show a specific date
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  };

  return date.toLocaleDateString("en-GB", options); // e.g., "12 Jan 24"
}

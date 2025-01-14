interface LoadingProps {
  dark?: boolean;
}

export function Loading({ dark = false }: LoadingProps) {
  return (
    <div className="flex items-center justify-center space-x-2">
      {dark ? (
        <div className="w-5 h-5 border-4 border-t-transparent border-background-primary rounded-full animate-spin"></div>
      ) : (
        <div className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
      )}
    </div>
  );
}

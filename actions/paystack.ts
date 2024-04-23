interface Props {
  email: string;
  amount: number;
  secretKey: string;
  callback: string;
}

export const initializeTransaction = async ({
  email,
  amount,
  secretKey,
  callback,
}: Props) => {
  const params = JSON.stringify({
    email,
    amount,
    callback,
  });

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: params,
  };

  try {
    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      options
    );
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error initializing transaction:", error);
    throw error;
  }
};

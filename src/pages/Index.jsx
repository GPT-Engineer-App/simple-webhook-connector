import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://24c6ae20-e6c8-4e33-a26d-8d3c96d82866-00-1175pigntlzx5.riker.replit.dev/first_contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
      setResponse({ error: 'An error occurred' });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center mb-2">Phone Number Validator</h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter a phone number to check its validity and get detailed information about it.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            required
          />
          <Button type="submit" className="w-full">Submit</Button>
        </form>
        {response && (
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
            {JSON.stringify(response, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

export default Index;

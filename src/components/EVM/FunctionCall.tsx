import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Contract, JsonRpcProvider } from "ethers";
import { ABI } from "../../config";

export interface FunctionCallFormHandle {
  createTransaction: () => Promise<any>;
  afterRelay: () => void;
}

interface FunctionCallFormProps {
  Evm: any; // use proper type from chainsig
  senderAddress: string;
  contractAddress: string;
  rpcUrl: string;
  isLoading: boolean;
}

export const FunctionCallForm = forwardRef<FunctionCallFormHandle, FunctionCallFormProps>(
  ({ Evm, senderAddress, contractAddress, rpcUrl, isLoading }, ref) => {
    const [number, setNumber] = useState(1000);
    const [currentNumber, setCurrentNumber] = useState("");

    const provider = new JsonRpcProvider(rpcUrl);
    const contract = new Contract(contractAddress, ABI, provider);

    const getNumber = async () => {
      const result = await contract.get();
      setCurrentNumber(String(result));
    };

    useEffect(() => {
      getNumber();
    }, []);

    useImperativeHandle(ref, () => ({
      async createTransaction() {
        const data = contract.interface.encodeFunctionData("set", [number]);
        return await Evm.prepareTransactionForSigning({
          from: senderAddress as `0x${string}`,
          to: contractAddress as `0x${string}`,
          data,
        });
      },
      async afterRelay() {
        getNumber();
      },
    }));

    return (
      <div>
        <input value={number} type="number" onChange={(e) => setNumber(Number(e.target.value))} disabled={isLoading} />
        <div>Current: {currentNumber}</div>
      </div>
    );
  }
);

FunctionCallForm.displayName = "FunctionCallForm";

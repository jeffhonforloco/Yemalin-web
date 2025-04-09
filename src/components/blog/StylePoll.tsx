
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import useAnalytics from '@/hooks/useAnalytics';
import { PollIcon } from 'lucide-react';

export interface PollOption {
  id: string;
  text: string;
  imageUrl?: string;
  votes: number;
}

interface StylePollProps {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes?: number;
  pollType?: 'text' | 'image';
  className?: string;
}

const StylePoll = ({ 
  id, 
  question, 
  options: initialOptions, 
  totalVotes = 0, 
  pollType = 'text',
  className = ''
}: StylePollProps) => {
  const { user } = useAuth();
  const { trackEvent } = useAnalytics();
  const [options, setOptions] = useState<PollOption[]>(initialOptions);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [totalPollVotes, setTotalPollVotes] = useState(totalVotes);
  
  const handleVote = (optionId: string) => {
    if (hasVoted) return;
    
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to vote in polls",
        variant: "default"
      });
      return;
    }
    
    // Track the vote
    trackEvent('poll_vote', {
      poll_id: id,
      poll_question: question,
      option_id: optionId
    });
    
    // Update poll options with new vote counts
    const updatedOptions = options.map(option => {
      if (option.id === optionId) {
        return { ...option, votes: option.votes + 1 };
      }
      return option;
    });
    
    setOptions(updatedOptions);
    setSelectedOption(optionId);
    setHasVoted(true);
    setTotalPollVotes(totalPollVotes + 1);
    
    toast({
      title: "Vote recorded",
      description: "Thanks for participating in our poll!"
    });
  };
  
  const calculatePercentage = (votes: number) => {
    if (totalPollVotes === 0) return 0;
    return Math.round((votes / totalPollVotes) * 100);
  };
  
  return (
    <div className={`border rounded-lg p-6 bg-white ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <PollIcon className="h-5 w-5" />
        <h3 className="text-lg font-medium">{question}</h3>
      </div>
      
      <div className="space-y-4 mt-6">
        {pollType === 'image' ? (
          <div className="grid grid-cols-2 gap-4">
            {options.map(option => (
              <div 
                key={option.id}
                className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                  selectedOption === option.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
                } ${hasVoted ? 'pointer-events-none' : ''}`}
                onClick={() => handleVote(option.id)}
                data-track="poll_option"
              >
                {option.imageUrl && (
                  <div className="relative h-40">
                    <img 
                      src={option.imageUrl} 
                      alt={option.text}
                      className="w-full h-full object-cover" 
                    />
                    {hasVoted && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {calculatePercentage(option.votes)}%
                        </span>
                      </div>
                    )}
                  </div>
                )}
                <div className="p-3">
                  <p>{option.text}</p>
                  {hasVoted && (
                    <p className="text-sm text-gray-500">{option.votes} votes</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {options.map(option => (
              <div key={option.id} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span>{option.text}</span>
                  {hasVoted && (
                    <span className="text-sm font-medium">{calculatePercentage(option.votes)}%</span>
                  )}
                </div>
                
                {hasVoted ? (
                  <Progress value={calculatePercentage(option.votes)} className="h-2" />
                ) : (
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto py-3 text-left"
                    onClick={() => handleVote(option.id)}
                    data-track="poll_option"
                  >
                    {option.text}
                  </Button>
                )}
              </div>
            ))}
          </>
        )}
      </div>
      
      {hasVoted && (
        <div className="mt-4 text-center text-sm text-gray-500">
          {totalPollVotes} total votes
        </div>
      )}
    </div>
  );
};

export default StylePoll;

import { useState, useEffect, type FC } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

interface AIAssistanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  suggestion: string;
  isLoading: boolean;
  error?: string;
  onAccept: (text: string) => void;
  onEdit: (text: string) => void;
  onDiscard: () => void;
}

const AIAssistanceModal: FC<AIAssistanceModalProps> = ({
  isOpen,
  onClose,
  suggestion,
  isLoading,
  error,
  onAccept,
  onEdit,
  onDiscard,
}) => {
  const { t, isRTL } = useLanguage();
  const [editedText, setEditedText] = useState(suggestion);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditedText(suggestion);
    setIsEditing(false);
  }, [suggestion]);

  const handleAccept = () => {
    onAccept(isEditing ? editedText : suggestion);
    onClose();
  };

  const handleEdit = () => {
    if (isEditing) {
      onEdit(editedText);
      onClose();
    } else {
      setIsEditing(true);
    }
  };

  const handleDiscard = () => {
    onDiscard();
    onClose();
  };

  const isSuggestionEmpty = !suggestion.trim();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-2xl ${isRTL ? 'text-right' : 'text-left'}`}>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {t('situation.aiSuggestion')}
          </DialogTitle>
          <DialogDescription>
            {t('situation.reviewAISuggestion') ||
              'Review the AI-generated suggestion below. You can accept it as is, edit it, or discard it.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className={`${isRTL ? 'mr-3' : 'ml-3'} text-gray-600`}>
                {t('situation.generating')}
              </span>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-600">{t('situation.error')}</p>
              <p className="text-sm text-red-500 mt-1">{error}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {isEditing ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {t('situation.editLabel') || 'Edit the suggestion:'}
                  </label>
                  <Textarea
                    value={editedText}
                    onChange={e => setEditedText(e.target.value)}
                    className={`min-h-32 ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={t('situation.editPlaceholder') || 'Edit the suggestion...'}
                  />
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <p className={`text-gray-800 whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                    {suggestion}
                  </p>
                </div>
              )}

              <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Button
                  onClick={handleAccept}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={isSuggestionEmpty}
                >
                  {t('situation.accept')}
                </Button>
                <Button
                  onClick={handleEdit}
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  disabled={isSuggestionEmpty}
                >
                  {isEditing ? t('situation.applyEdit') || 'Apply Edit' : t('situation.edit')}
                </Button>
                <Button
                  onClick={handleDiscard}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  {t('situation.discard')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIAssistanceModal;
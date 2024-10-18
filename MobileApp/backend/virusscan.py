import subprocess

def scan_file_with_clamav(file_path):
    try:
        # Run clamscan command to scan the file
        result = subprocess.run(['clamscan', file_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        
        # Check the output and return the result
        if "Infected files: 0" in result.stdout:
            return False
            # print("The file is clean.")
        else:
            return True
            # print("The file is infected or there was an issue.")
            # print(result.stdout)
    
    except Exception as e:
        print("Error running ClamAV:", str(e))

# Usage
# file_path = '/Users/navadinnehrut/Downloads/CtrlShiftGeek-Presentation.pdf'
# scan_file_with_clamav(file_path)